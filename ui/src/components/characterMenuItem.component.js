import { useState } from "react";
import { 
    Flex,
    Link,
    Button,
    HStack,
    useToast
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function CharacterMenuItem({character, index, editCharacterCallback, deleteCharacter}) {
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const toast = useToast();
    const triggerDeleteCharacter = (index) => {
        if (!deleteConfirmed) {
            setDeleteConfirmed(true);
            toast({
                title: "Delete character?",
                description: "Click again to confirm.",
                status: "warning",
                duration: 4000,
            });
        } else {
            deleteCharacter(index);
        }
    }

    return (
        <Flex 
            key={index}
            justifyContent="space-between"
        >
            <Link href={`/characters/${character.id}`}>{character.name}</Link>
            <HStack spacing="5px">
                <Button onClick={() => editCharacterCallback(index)} bg='transparent'>
                    <EditIcon/>
                </Button>

                <Button onClick={() => triggerDeleteCharacter(index)} bg='transparent'>
                    <DeleteIcon color={deleteConfirmed ? 'red' : 'gray'}/>
                </Button>

                
            </HStack>
        </Flex>
    );
}

export default CharacterMenuItem;