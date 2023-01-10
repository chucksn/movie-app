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
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

function MovieDetailModal() {
  const { onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    dispatch({ type: "CARD_CLICK_RESET" });
  };

  return (
    <Modal
      isOpen={onOpen}
      onClose={handleClose}
      size={{ base: "xl", md: "2xl", lg: "4xl", xl: "6xl" }}
    >
      <ModalOverlay bgColor="blackAlpha.50" />
      <ModalContent pt="0.5rem" pb="0.5rem">
        <ModalCloseButton />
        <ModalBody>
          <Flex flexWrap={{ base: "wrap", lg: "nowrap" }}>
            <Image
              src="https://image.tmdb.org/t/p/w780/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
              alt="poster"
              maxW={{ base: "100%", lg: "400px" }}
            />
            <Flex direction="column" justify="space-around" w="100%" pl="1rem">
              <Box textAlign="center" w="100%" bgColor="gray.300">
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
                >
                  MOVIE TITLE
                </Box>
                <Box
                  as="span"
                  fontSize={{
                    base: "1.2rem",
                    lg: "1.3rem",
                    xl: "1.5rem",
                  }}
                  fontWeight="500"
                  fontFamily="cursive"
                >
                  Tagline
                </Box>
              </Box>
              <Box as="span" bgColor="gray.300" p="0.6rem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                nam possimus dolore in quo natus ducimus magnam quasi! Sapiente
                quibusdam quaerat facilis aperiam numquam, odio rem omnis quam!
                Dolorem, eum.
              </Box>
              <Box></Box>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MovieDetailModal;
