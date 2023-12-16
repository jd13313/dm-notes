import { 
  Box,
  Flex,
  Link,
  Text
} from "@chakra-ui/react"
import CharacterMenu from "./components/characterMenu.component";

function DmNote() {
  return (
    <div className="DmNote">
        <Flex>
          <Box w='35%' bg='nord5' p={10}>
            <Box mb={5} ml={-10}>
              <Text 
                as='h1'
                fontWeight={700}
                borderBottom='2px solid'
                borderColor='nord0'
                pl={10}
                pb={2}
                fontSize='1.5em'
              >
                DM Note
              </Text>
            </Box>
            <Box>
              <Link href={'/'}>Home</Link>
            </Box>
            <CharacterMenu />
          </Box>
          <Box w='65%' bg='nord6' p={10}>
            Content
          </Box>
        </Flex>
    </div>
  );
}

export default DmNote;
