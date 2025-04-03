import { Group, SegmentedControl, Stack, Title } from "@mantine/core";
import { useState } from "react";
import UpcomingBookings from "./upcoming-bookings";
import PreviousBookings from "./previous-bookings";
import CancelledBookings from "./cancelled-bookings";

const Bookings = () => {
  const [selectedValue, setSelectedValue] = useState("upcoming");
  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title>
            {selectedValue === "upcoming"
              ? "Upcoming Bookings"
              : selectedValue === "completed"
              ? "Completed Bookings"
              : "Cancelled Bookings"}
          </Title>
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

        {selectedValue === "upcoming" ? (
          <UpcomingBookings />
        ) : selectedValue === "completed" ? (
          <PreviousBookings />
        ) : (
          <CancelledBookings />
        )}
      </Stack>
    </>
  );
};
export default Bookings;
