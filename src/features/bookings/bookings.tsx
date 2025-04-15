import { Group, SegmentedControl, Stack, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import UpcomingBookings from "./upcoming-bookings";
import PreviousBookings from "./previous-bookings";
import CancelledBookings from "./cancelled-bookings";

const Bookings = () => {
  const [selectedValue, setSelectedValue] = useState("upcoming");

  const [titleToRender, statusComponent] = useMemo(() => {
    if (selectedValue === "upcoming")
      return ["Upcoming Bookings", <UpcomingBookings />];
    if (selectedValue === "completed")
      return ["Completed Bookings", <PreviousBookings />];

    return ["Cancelled Bookings", <CancelledBookings />];
  }, [selectedValue]);

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title>{titleToRender}</Title>
          <SegmentedControl
            value={selectedValue}
            onChange={setSelectedValue}
            data={[
              { label: "Upcoming Bookings", value: "upcoming" },
              { label: "Completed Bookings", value: "completed" },
              { label: "Cancelled Bookings", value: "cancelled" },
            ]}
            color={"green"}
            transitionDuration={600}
            transitionTimingFunction="linear"
          />
        </Group>

        {statusComponent}
      </Stack>
    </>
  );
};
export default Bookings;
