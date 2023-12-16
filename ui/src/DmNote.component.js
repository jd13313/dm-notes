import { useEffect, useState } from "react";
import { 
  Accordion, 
  AccordionIcon, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  Box,
  Flex, 
  Link, 
  Spinner
} from "@chakra-ui/react"
const callBackendApi = async () => {
  const response = await fetch('/express_backend');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  return body;
};

function DmNote() {
  const [navItems, setNavItems] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    callBackendApi()
      .then(res => setNavItems(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="DmNote">
        <Flex>
          <Box w='35%' bg='nord5' p={10}>
            {
              navItems.map((navItem, index) => (
                navItem.hasAccordion ? ( 
                <Accordion key={index} allowToggle={true}>
                  <AccordionItem>
                    <AccordionButton p={0}>
                      {navItem.name}
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      {
                        navItem.subNav &&
                        navItem.subNav.map((subNavItem, index) => (
                          <Box key={index}>
                            <Link href={subNavItem.href}>{subNavItem.name}</Link>
                          </Box>
                        ))
                      }
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                ) : (
                  <Box key={index}>
                    <Link href={navItem.href}>{navItem.name}</Link>
                  </Box>
                )
              ))
            }
          </Box>
          <Box w='65%' bg='nord6'>
            Content
          </Box>
        </Flex>
    </div>
  );
}

export default DmNote;
