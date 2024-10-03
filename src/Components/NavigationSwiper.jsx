import { Box } from "@mui/material";
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NavigationSwiper = ({ children }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: "100%",
        opacity: "0.6",
        paddingBottom: "3rem",
        transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển động
      },
      "& .swiper-slide-active": { opacity: 1,
         transform: "scale(1.05)" // Tăng kích thước của slide hiện tại
       },
      "& .swiper-pagination-bullet": {
        backgroundColor: "white", // Tùy chỉnh màu của các dấu chấm phân trang
        opacity: 0.7,
        "&.swiper-pagination-bullet-active": {
          opacity: 1, // Làm nổi bật dấu chấm đang hoạt động
        }
      },
      "& .swiper-pagination": {
        bottom: "80px", // Điều chỉnh khoảng cách từ dưới lên
        textAlign: "center", // Căn giữa dấu chấm
      },
      "& .swiper-button-next, & .swiper-button-prev": {
        color: "white", // Thay đổi màu cho nút Prev và Next
        "&::after": {
          fontSize: { xs: "1rem", md: "2rem" }
        },
        top: "50%", // Căn giữa theo chiều dọc
        transform: "translateY(-50%)", // Dịch chuyển theo chiều dọc để thật sự căn giữa
        "&::after": {
          fontSize: { xs: "1rem", md: "2rem" }
        }
      },
      "& .swiper-button-next": {
        right: "140px" // Đảm bảo nút Next nằm ở đúng vị trí
      },
      "& .swiper-button-prev": {
        left: "90px" // Đảm bảo nút Prev nằm ở đúng vị trí
      },
      "& .swiper": {
        paddingX: { xs: "1rem", md: "4rem" }
      }
    }}>
      <Swiper
        spaceBetween={-155}
        grabCursor={true}
        slidesPerView={1.05} // Hiển thị một phần của slide tiếp theo
        navigation // Thêm điều hướng Prev/Next
        pagination={{ clickable: true }} // Thêm Pagination với tính năng click
        loop={false} // Thêm thuộc tính loop để lặp lại slide
        modules={[Navigation, Pagination]}
        style={{ width: "90%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;
