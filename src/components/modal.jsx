import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Image,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AiFillCaretRight } from "react-icons/ai";
import CastCard from "./castCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper";
import { useRef } from "react";

function MovieDetailModal({
  modalPosterPath,
  movieTitle,
  tagline,
  overview,
  castData,
  year,
}) {
  const { onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    dispatch({ type: "CARD_CLICK_RESET" });
    dispatch({ type: "MODAL_DATA_RESET" });
  };

  let image =
    modalPosterPath === null
      ? "./no-poster.jpg"
      : `https://image.tmdb.org/t/p/w500${modalPosterPath}`;

  return (
    <Modal
      isOpen={onOpen}
      onClose={handleClose}
      size={{ base: "xl", md: "2xl", lg: "4xl", xl: "6xl" }}
      scrollBehavior="inside"
    >
      <ModalOverlay bgColor="blackAlpha.200" />
      <ModalContent
        pt="0.5rem"
        pb="0.5rem"
        bgColor="gray.800"
        h={{ base: "100vh", sm: "640px" }}
      >
        <ModalCloseButton color="gray.300" />
        <ModalBody className="modal-body">
          <Flex
            flexWrap={{ base: "wrap", lg: "nowrap" }}
            justify={{ base: "center", lg: "normal" }}
          >
            <Image
              src={image}
              alt="poster"
              maxW={{ base: "60%", sm: "70%", md: "80%", lg: "400px" }}
              objectFit="contain"
            />
            <Flex direction="column" justify="space-around" w="100%" pl="1rem">
              <Box textAlign="center" w="100%" p="0.6rem">
                <Box
                  as="h1"
                  fontSize={{
                    base: "1.2rem",
                    md: "1.5rem",
                    lg: "2rem",
                    xl: "2.2rem",
                  }}
                  fontWeight="500"
                  fontFamily='"Ubuntu", sans-serif'
                  color="teal.400"
                >
                  {movieTitle}
                </Box>
                <Box
                  as="span"
                  fontSize={{
                    base: "0.9rem",
                    lg: "1rem",
                    xl: "1.2rem",
                  }}
                  fontWeight="500"
                  fontFamily="cursive"
                  color="yellow.400"
                >
                  {tagline}
                  <br />
                  <span style={{ color: "green", fontSize: "1.2rem" }}>
                    {year}
                  </span>
                </Box>
              </Box>
              <Box
                as="span"
                bgColor="gray.900"
                color="gray.200"
                p="0.6rem"
                borderRadius="0.9rem"
                fontSize={{ base: "0.9rem", lg: "1rem" }}
                fontWeight="500"
                overflowY="scroll"
                maxHeight={{ base: "8rem", sm: "11rem" }}
                className="overview"
              >
                {overview}
              </Box>
              <Box
                display={{ base: "none", sm: "flex" }}
                maxW={{ base: "100%", lg: "28rem", xl: "43rem" }}
                mt="0.9rem"
                position="relative"
                alignItems="center"
                maxH="15rem"
              >
                <i className="fa-solid fa-circle-chevron-left"></i>
                <Swiper
                  spaceBetween={0}
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    nextEl: ".fa-circle-chevron-right",
                    prevEl: ".fa-circle-chevron-left",
                  }}
                  breakpoints={{
                    500: { slidesPerView: 5 },
                    280: { slidesPerView: 4 },
                  }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                  }}
                >
                  {castData.map((data) => (
                    <SwiperSlide>
                      <CastCard
                        key={data.cast_id}
                        castName={data.name}
                        character={data.character}
                        castImgPath={data.profile_path}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <i className="fa-solid fa-circle-chevron-right"></i>
              </Box>
              <Button
                colorScheme="red"
                mt="0.8rem"
                w="100%"
                leftIcon={<AiFillCaretRight />}
              >
                WATCH TRAILER
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MovieDetailModal;
