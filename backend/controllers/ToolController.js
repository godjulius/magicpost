const {models: {Order, Customer, Parcel, ParcelType, Branch}} = require("../models");
const Joi = require("joi");
const puppeteer = require("puppeteer");
const QRCode = require("qrcode");

class ToolController {

    //GET /print/:orderId
    async print(req, res) {
        const schema = Joi.string().pattern(new RegExp('^[A-Z0-9]+$')).required();
        const validateResult = schema.validate(req.params.orderId);
        if (validateResult.error) {
            return res.status(403).send("Bad request");
        }
        const order = await Order.findOne({
            where: {
                order_id: req.params.orderId,
            },
            include: [
                {
                    model: Customer,
                    required: true,
                }, {
                    model: Parcel,
                    required: true,
                    include: [
                        {
                            model: ParcelType,
                            required: true,
                        },
                    ],
                }, {
                    model: Branch,
                    required: true,
                }
            ]
        });
        if (!order) {
            return res.status(404).json({
                msg: "Order not found",
            });
        }
        const customerName = `${order.customer.first_name} ${order.customer.last_name}`;
        const customerAddress = order.customer.address;
        const customerPhone = order.customer.address;
        const receiverName = order.receiver_name;
        const receiverAddress = order.receiver_address;
        const receiverPhone = order.receiver_phone
        const weight = order.parcel.weight;
        const price = order.parcel.price;
        const qrCodeDataURL = await QRCode.toDataURL(`http://localhost:8081/SearchPage/${req.params.orderId}`);
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Đặt nội dung HTML cho trang, trong trường hợp này là một bảng
            const htmlContent = `
                <html>
                    <head>
                        <style>
                            body{
                                font-size: x-small;
                            }
                           .container {
                              display: flex;
                              justify-content: space-between;
                              margin: 0;
                              height: 80vh;
                            }
                            .column {
                              flex: 1;
                              padding: 20px;
                              border: 1px solid #ddd;
                            }
                            ul{
                              list-style: none;
                              margin: 0;
                            }
                            li{
                              font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                    <img src="https://i.imgur.com/yIHRYbK.png" style="height: 13vh;width: auto"/>
                    <img src="${qrCodeDataURL}" style="height: 13vh;width: auto;right: 0"/>
                        <div class="container">
                            <div class="column">
                            <ul>
                                <li>1. Họ tên địa chỉ người gửi</li>
                                <p>${customerName}</p>
                                <p>${customerAddress}</p>
                                <p>${customerPhone}</p>
                                <li>2. Họ tên địa chỉ người nhận</li>
                                <p>${receiverName}</p>
                                <p>${receiverAddress}</p>
                                <p>${receiverPhone}</p>
                                <li>3. Khối lượng(kg)</li>
                                <p>Khối lượng thực tế: ${weight}</p>
                                <li>4. Chỉ dẫn của người gửi khi không phát được bưu gửi</li>
                                <input type="checkbox">Chuyển hoàn ngay
                                <input type="checkbox">Gọi điện cho người gửi/BC gửi
                                <input type="checkbox">Chuyển hoàn trước ngày
                                <input type="checkbox">Huỷ
                                <input type="checkbox">Chuyển hoàn khi hết thời gian lưu trữ
                                <li>5. Dịch vụ đặc biệt/Cộng thêm</li>
                                <p></p><p></p>
                                <li>6. Cam kết của người gửi</li>
                                <p>Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không 
                                chứa những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện chỉ
                                 dẫn tại mục 4, tôi sẽ trả cước chuyển hoàn.</p>
                            </ul>
                            </div>
                            <div class="column">
                                <ul>
                                <li>7. Cước(VND)</li>
                                <p>Cước: ${price}</p>
                                <li>8. Thu của người nhận</li>
                                <p>COD: </p>
                                <p>Thu khác</p>
                                <p>Tổng thu</p>
                                <li>9. Bưu cục chấp nhận</li>
                                <p>Chữ ký GDV nhận</p>
                                <br><br><br><br>
                                <li>10. Ngày giờ nhận</li>
                                <p>.........................</p>
                                <p>Người nhận/Người được uỷ quyền nhận</p>
                                <p>(Ký, ghi rõ họ tên)</p>
                                </ul>
                            </div>
                        </div>
                        <p style="color: black;font-weight: bold;text-align: center">
                        Hotline: 0345643253
                        </p>
                    </body>
                </html>
    `;

            await page.setContent(htmlContent);

            const pdfBuffer = await page.pdf({
                format: 'A5',
                landscape: true,
            });
            await browser.close();

            // Gửi tệp PDF về client
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=print.pdf');
            res.send(pdfBuffer);
        } catch (error) {
            console.error('Error generating or printing PDF:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ToolController();