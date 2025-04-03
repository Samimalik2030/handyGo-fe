import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Avatar,
  Flex,
  Stack,
  Title,
  Checkbox,
  Menu,
  Radio,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import IconLocation from "../assets/IconLocation";
import IconEye from "../assets/IconEye";
import IconCar from "../assets/IconCar";
import IconCalendar from "../assets/IconCalendar";
import IconPhone from "../assets/IconPhone";

export default function WorkshopCard() {
 
  
  
  return (
 
    <>
    <Group justify="space-between" align="center">
          <Text fz={"lg"} fw={700}>
             properties result
          </Text>
          <Group gap={10} align="center">
            <TextInput placeholder="Search" />
            <Menu
              shadow="md"
              width={400}
              radius={"lg"}
         
            >
              <Menu.Target>
                <Button  variant="outline">
                  Filter
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <ScrollArea h={400}>
                  <Menu.Item
                    c={"red"}
                    // onClick={() => {
                    //   setTypes([]);
                    //   setDietaryRestriction("");
                    //   setSmoking("");
                    //   setPets("");
                    // }}
                  >
                    Clear All Filters
                  </Menu.Item>

                  <Menu.Divider />
                  <Menu.Label fz={"md"}>Prefered Cities</Menu.Label>
                  {[
                    "London",
                    "Paris",
                    "Madrid & Salamanca",
                    "Dublin",
                    "Valletta",
                  ].map((option) => (
                    <Menu.Item key={option}>
                      <Checkbox
                        label={option}
                        // checked={cities.includes(option)}
                        // onChange={() =>
                        //   handleCheckboxChange(setCities, cities, option)
                        // }
                      />
                    </Menu.Item>
                  ))}

                  <Menu.Divider />
                  <Menu.Label fz={"md"}>Property Type</Menu.Label>
                  {["Apartment", "House", "Room", "Others"].map((option) => (
                    <Menu.Item key={option}>
                      <Checkbox
                        label={option}
                        // checked={types.includes(option)}
                        // onChange={() =>
                        //   handleCheckboxChange(setTypes, types, option)
                        // }
                      />
                    </Menu.Item>
                  ))}

                  <Menu.Divider />
                  <Menu.Label fz={"md"}>Dietary Restrictions</Menu.Label>
                  {[
                    "Vegetarian",
                    "Vegan",
                    "Gluten Free",
                    "Halal",
                    "Others",
                  ].map((option) => (
                    <Menu.Item key={option}>
                      <Checkbox
                        label={option}
                        // checked={dietaryRestriction === option}
                        // onChange={() => setDietaryRestriction(option)}
                      />
                    </Menu.Item>
                  ))}

                  <Menu.Divider />
                  <Menu.Label fz={"md"}>Smoker</Menu.Label>
                  {["Yes", "No"].map((option) => (
                    <Menu.Item key={option}>
                      <Radio
                        label={option}
                        // checked={smoking === option}
                        // onChange={() => setSmoking(option)}
                      />
                    </Menu.Item>
                  ))}

                  <Menu.Divider />
                  <Menu.Label fz={"md"}>Having Pets</Menu.Label>
                  {["Yes", "No"].map((option) => (
                    <Menu.Item key={option}>
                      <Radio
                        label={option}
                        // checked={pets === option}
                        // onChange={() => setPets(option)}
                      />
                    </Menu.Item>
                  ))}
                </ScrollArea>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

    </>
  );
}
