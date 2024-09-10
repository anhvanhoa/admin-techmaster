# Admin Techmaster

## Giới thiệu

Dự án này sử dụng Refine để xây dựng các ứng dụng CRUD dựa trên React mà không bị ràng buộc.

## Cài đặt và Chạy Dự án trên Máy tính

### Yêu cầu

-   Node.js (phiên bản 18 trở lên)
-   npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**:

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Cài đặt các dependencies**:
   Nếu bạn sử dụng npm:

    ```sh
    npm install
    ```

    Hoặc nếu bạn sử dụng yarn:

    ```sh
    yarn install
    ```

3. **Chạy dự án**:
   Nếu bạn sử dụng npm:

    ```sh
    npm run dev
    ```

    Hoặc nếu bạn sử dụng yarn:

    ```sh
    yarn start
    ```

4. **Mở trình duyệt và truy cập**:
    ```
    http://localhost:3000
    ```

## Build và Chạy Dự án với Docker

### Yêu cầu

-   Docker

### Các bước build và chạy

1. **Build Docker image**:

    ```sh
    docker build -t admin-front-end .
    ```

2. **Chạy Docker container**:

    ```sh
    docker run -p 3000:80 admin-front-end
    ```

3. **Mở trình duyệt và truy cập**:
    ```
    http://localhost:3000
    ```