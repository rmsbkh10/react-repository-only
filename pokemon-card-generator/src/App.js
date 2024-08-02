import { Button, Box, Image, Heading, Flex } from "@chakra-ui/react";

import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const handleButtonClick = () => {
    setShowData(!showData);
  };
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.results.map((result) => ({
            id: result.url.match(/\/([0-9]*)\/$/)[1],
            name: result.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              result.url.match(/\/([0-9]*)\/$/)[1]
            }.png`
          }))
        )
      );
  }, []);
  return (
    <Box p="6" backgroundColor="#03001C">
      <Heading mb="6" textAlign="center" color="white">
        My Pokemon Collection
      </Heading>
      <Flex justifyContent="center">
        <Button colorScheme="teal" onClick={handleButtonClick}>
          {showData ? "Hide Pokemon" : "Show Pokemon"}
        </Button>
      </Flex>
      <Flex mt="6" flexWrap="wrap" justifyContent="center">
        {showData &&
          data.map((result) => (
            <Box
              key={result.id}
              boxShadow="0 0 10px 3px rgba(0, 128, 128, 0.5)" // add a teal shadow
              rounded="md"
              overflow="hidden"
              mx="4"
              my="2"
              _hover={{ boxShadow: "lg" }}
              transition="box-shadow 0.2s"
            >
              <Image src={result.image} alt={result.name} />
              <Box p="4">
                <Heading
                  as="h3"
                  size="md"
                  textAlign="center"
                  color="whiteAlpha.800"
                >
                  {result.name}
                </Heading>
              </Box>
            </Box>
          ))}
      </Flex>
    </Box>
  );
 }
export default App;