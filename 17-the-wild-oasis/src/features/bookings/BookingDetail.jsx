import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckin } from "../check-in-out/useCheckin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resourceName="booking" />;

    const { status, id } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && (
                    <Button
                        onClick={() => checkin(booking.id)}
                        disabled={isCheckingIn}
                    >
                        Check in
                    </Button>
                )}

                <Modal>
                    <Modal.Open opens={"deleteBooking"}>
                        <Button variation="danger" disabled={isDeleting}>
                            Delete
                        </Button>
                    </Modal.Open>
                    <Modal.Window name={"deleteBooking"}>
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isDeleting}
                            onConfirm={() =>
                                deleteBooking(booking.id, {
                                    onSettled: () => navigate(-1),
                                })
                            }
                        ></ConfirmDelete>
                    </Modal.Window>
                </Modal>

                {status === "checked-in" && (
                    <Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkout(booking.id)}
                        disabled={isCheckingOut}
                    >
                        Check out
                    </Button>
                )}

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
