# PutMan - Công cụ Kiểm thử API Cá nhân (Postman Alternative MVP)

PutMan là công cụ web giúp bạn gửi request và kiểm thử API nhanh chóng, giao diện dark mode hiện đại, tích hợp proxy server để vượt qua giới hạn CORS của trình duyệt.

## Tính năng nổi bật

- **Đầy đủ HTTP Methods**: Hỗ trợ GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS với nhãn màu trực quan.
- **Backend Proxy tích hợp**: Bypass hoàn toàn cơ chế chặn CORS của trình duyệt khi test API bên ngoài. Cho phép bật/tắt linh hoạt chế độ Proxy hoặc Fetch trực tiếp.
- **Quản lý Query Params & Headers**:
  - Giao diện dạng bảng key-value tiện dụng.
  - Tự động đồng bộ 2 chiều giữa bảng Params và thanh địa chỉ URL.
  - Bật/tắt hoặc xoá từng dòng param/header nhanh chóng.
- **Soạn thảo Request Body đa dạng**:
  - `JSON`: Trình soạn thảo kèm tính năng Prettify JSON và kiểm tra cú pháp.
  - `form-data`: Hỗ trợ multipart key-value.
  - `x-www-form-urlencoded`: Soạn thảo form urlencoded.
  - `Raw text`: Văn bản thô.
- **Xác thực (Authorization)**:
  - Bearer Token
  - Basic Auth (tự động mã hóa Base64)
  - API Key (thêm vào Header hoặc Query param)
- **Bộ hiển thị phản hồi (Response Viewer)**:
  - Thống kê chi tiết: HTTP Status Code, Thời gian phản hồi (ms/s), Dung lượng (Bytes/KB).
  - Định dạng hiển thị: Pretty (tô màu cú pháp JSON), Raw text, và Preview (xem trước HTML/hình ảnh).
  - Danh sách Headers trả về từ server có sắp xếp và tra cứu.
  - Nút sao chép nội dung phản hồi (Copy to clipboard) và tải về file (Download).
- **Lịch sử Request & Mẫu sẵn (Presets)**:
  - Tự động lưu lịch sử request vào LocalStorage.
  - Hỗ trợ tìm kiếm lịch sử, nạp lại toàn bộ cấu hình request chỉ với 1 click.
  - Mẫu API thông dụng có sẵn (JSONPlaceholder, HTTPBin).
- **Phím tắt**: Nhấn `Cmd + Enter` (macOS) hoặc `Ctrl + Enter` (Windows/Linux) để gửi request tức thì.

## Hướng dẫn cài đặt & Khởi chạy

### Yêu cầu
- Node.js version 18 trở lên

### Khởi chạy
```bash
npm install
npm start
```

Ứng dụng sẽ hoạt động tại: [http://localhost:3000](http://localhost:3000)
