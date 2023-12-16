import { useState, useEffect } from "react";
import mainStore from "../store";
import { 
  Accordion, 
  AccordionIcon, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  Box,
  Link, 
  Spinner,
  useDisclosure,
  Button
} from "@chakra-ui/react"

import {
    PlusSquareIcon,
    EditIcon
} from "@chakra-ui/icons"
import CharacterAddModal from "./modals/characterAdd.component";

const fetchCharacterList = async () => {
  const response = await fetch('/v1/characters');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  return body;
};

function CharacterMenu() {
  const characters = mainStore(state => state.characters);
  const setCharacters = mainStore(state => state.setCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { 
    isOpen: isCharacterAddModalOpen,
    onOpen: onCharacterAddModalOpen,
    onClose: onCharacterAddModalClose
   } = useDisclosure();

   const {
    isOpen: isCharacterEditModalOpen,
    onOpen: onCharacterEditModalOpen,
    onClose: onCharacterEditModalClose
   } = useDisclosure();

  const editCharacter = (characterIndex) => {
    setSelectedCharacter(characters[characterIndex]);
    onCharacterEditModalOpen();
  };

  const closeCharacterModal = (callback) => {
    callback();
    setSelectedCharacter(null);
  };

  useEffect(() => {
    fetchCharacterList()
      .then(res => setCharacters(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [setCharacters, setLoading, selectedCharacter]);

  if (loading) {
    return <Spinner />
  }

  return characters.length && (
    <div className="CharacterMenu">
        <Accordion allowToggle={true}>
            <AccordionItem>
            <AccordionButton p={0}>
                Characters
                <AccordionIcon ml='50px' />
            </AccordionButton>
            <AccordionPanel>
                {
                    characters &&
                    characters.map((character, index) => (
                        <Box key={index}>
                            <Link href={`/characters/${character.id}`}>{character.name}</Link>
                            <Button onClick={() => editCharacter(index)} ml='5' bg='transparent'>
                                <EditIcon/>
                            </Button>
                        </Box>
                    ))
                }
                <Box>
                    <Link 
                        onClick={onCharacterAddModalOpen}
                    >
                        <PlusSquareIcon mr='2'/>
                        Add Character
                    </Link>
                </Box>
            </AccordionPanel>
            </AccordionItem>
        </Accordion>
        <CharacterAddModal isOpen={isCharacterAddModalOpen} onClose={() => closeCharacterModal(onCharacterAddModalClose)}/>
        <CharacterAddModal isOpen={isCharacterEditModalOpen} onClose={() => closeCharacterModal(onCharacterEditModalClose)} selectedCharacterData={selectedCharacter}/>

    </div>
  );
}

export default CharacterMenu;