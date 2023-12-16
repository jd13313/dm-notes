import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Button, 
    FormControl,
    FormLabel,
    Input,
    Textarea,
    SimpleGrid,
    Box,
    Text,
    Center
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";

function CharacterAddModal({isOpen, onClose, selectedCharacterData}) {
    const [characterName, setCharacterName] = useState('');
    const [characterDescription, setCharacterDescription] = useState('');
    const [characterNotes, setCharacterNotes] = useState('');
    const [characterClass, setCharacterClass] = useState('');
    const [characterImage, setCharacterImage] = useState('');
    const [characterAc, setCharacterAc] = useState(0);
    const [characterHpMax, setCharacterHpMax] = useState(0);
    const [characterHpCurrent, setCharacterHpCurrent] = useState(0);
    const [characterStr, setCharacterStr] = useState(0);
    const [characterDex, setCharacterDex] = useState(0);
    const [characterCon, setCharacterCon] = useState(0);
    const [characterInt, setCharacterInt] = useState(0);
    const [characterWis, setCharacterWis] = useState(0);
    const [characterCha, setCharacterCha] = useState(0);

    useEffect(() => {
        setCharacterName(selectedCharacterData?.name || '');
        setCharacterDescription(selectedCharacterData?.description || '');
        setCharacterNotes(selectedCharacterData?.notes || '');
        setCharacterClass(selectedCharacterData?.class || '');
        setCharacterImage(selectedCharacterData?.image || '');
        setCharacterAc(selectedCharacterData?.ac || 0);
        setCharacterHpMax(selectedCharacterData?.hp_max || 0);
        setCharacterHpCurrent(selectedCharacterData?.hp_current || 0);
        setCharacterStr(selectedCharacterData?.str || 0);
        setCharacterDex(selectedCharacterData?.dex || 0);
        setCharacterCon(selectedCharacterData?.con || 0);
        setCharacterInt(selectedCharacterData?.int || 0);
        setCharacterWis(selectedCharacterData?.wis || 0);
        setCharacterCha(selectedCharacterData?.cha || 0);
    }, [selectedCharacterData]);

    const handleImageUpload = (files) => {
        const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (acceptedFileTypes.includes(files[0].type)) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);

            reader.onload = () => {
                setCharacterImage(reader.result);
            };
        } 
    };

    const clearCharacterImage = () => {
        setCharacterImage('');
    };

    const saveCharacter = () => {
        // Defaults to POST request for adding new character
        let method = 'POST';
        let requestUrl = '/v1/characters';
        const characterData = {
            name: characterName,
            description: characterDescription,
            notes: characterNotes,
            class: characterClass,
            image: characterImage,
            ac: characterAc,
            hp_max: characterHpMax,
            hp_current: characterHpCurrent,
            str: characterStr,
            dex: characterDex,
            con: characterCon,
            int: characterInt,
            wis: characterWis,
            cha: characterCha
        };

        // Handle PUT request if editing existing character
        if (selectedCharacterData?.id) {
            method = 'PUT';
            requestUrl += `/${selectedCharacterData.id}`;
        }
        
        fetch(requestUrl, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(characterData)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            onClose();
        })
        .catch(err => console.log(err));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent maxW="40vw">
                <ModalHeader>Add Character</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text as="h2" fontWeight={700} borderBottom="2px solid" borderColor="nord0" fontSize="1.5em" mb={2}>
                        Basic Info
                    </Text>

                    <SimpleGrid columns={2} spacing={2}>
                        <FormControl>
                            <FormLabel>Character Name</FormLabel>
                            <Input type="text" value={characterName} onChange={e => {setCharacterName(e.target.value)}}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea value={characterDescription} onChange={e => {setCharacterDescription(e.target.value)}}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Class</FormLabel>
                            <Input type="text" value={characterClass} onChange={e => {setCharacterClass(e.target.value)}}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image</FormLabel>
                            <Dropzone onDrop={handleImageUpload}>
                            {({getRootProps, getInputProps}) => !characterImage ? (
                                <Box 
                                    {...getRootProps()} 
                                    background='nord6' 
                                    p={2} 
                                    color="nord3"
                                    fontWeight={700}
                                >
                                    <input {...getInputProps()} value={characterImage}/>
                                    <Center h="100px">
                                        <Text align="center">
                                            Drag 'n' drop some files here <br/>
                                            Or click to select files
                                        </Text>
                                    </Center>
                                </Box>
                            ) : (
                                <>
                                    <img src={characterImage}/>
                                    <Button onClick={clearCharacterImage}>
                                        Replace
                                    </Button>
                                </>
                            )}
                            </Dropzone>
                        </FormControl>
                    </SimpleGrid>


                    <Text as="h2" fontWeight={700} borderBottom="2px solid" borderColor="nord0" fontSize="1.5em" mb={2} mt={2}>
                        Stats
                    </Text>
                    <SimpleGrid columns={5} spacing={2} mt={10} mb={10}>
                        <Box>
                            <FormControl>
                                <FormLabel>AC</FormLabel>
                                <Input type="number" w="75px" value={characterAc} onChange={e => {setCharacterAc(e.target.value)}}/>
                            </FormControl>
                        </Box>
                        
                        <Box>
                            <FormControl>
                                <FormLabel>HP</FormLabel>
                                <Input type="number" w="75px" value={characterHpCurrent}  onChange={e => {setCharacterHpCurrent(e.target.value)}}/>
                                / 
                                <Input type="number" w="75px" value={characterHpMax} onChange={e => {setCharacterHpMax(e.target.value)}}/>
                            </FormControl>
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={6} spacingX={2} spacingY={4}>
                        <Box>
                            <FormControl>
                                <FormLabel>STR</FormLabel>
                                <Input type="number" w="75px" value={characterStr} onChange={e => {setCharacterStr(e.target.value)}}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>DEX</FormLabel>
                                <Input type="number" w="75px" value={characterDex} onChange={e => {setCharacterDex(e.target.value)}}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>CON</FormLabel>
                                <Input type="number" w="75px" value={characterCon} onChange={e => {setCharacterCon(e.target.value)}}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>INT</FormLabel>
                                <Input type="number" w="75px" value={characterInt} onChange={e => {setCharacterInt(e.target.value)}}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>WIS</FormLabel>
                                <Input type="number" w="75px" value={characterWis} onChange={e => {setCharacterWis(e.target.value)}}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>CHA</FormLabel>
                                <Input type="number" w="75px" value={characterCha} onChange={e => {setCharacterCha(e.target.value)}}/>
                            </FormControl>
                        </Box>
                    </SimpleGrid>
                    <Box mt={10}>
                        <FormControl>
                            <FormLabel>Notes</FormLabel>
                            <Textarea value={characterNotes} onChange={e => {setCharacterNotes(e.target.value)}}/>
                        </FormControl>
                    </Box>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost" onClick={saveCharacter}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CharacterAddModal;