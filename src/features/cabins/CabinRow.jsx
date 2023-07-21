import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import useDeleteCabin from "./useDeleteCabin";
import { HiTrash, HiPencil, HiDocumentDuplicate } from "react-icons/hi";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(1px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

import React, { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();

  const {
    name,
    max_capacity,
    regular_price,
    discount,
    image_url,
    id: cabinId,
  } = cabin;
  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image_url,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image_url} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price> {formatCurrency(regular_price)} </Price>
        {discount ? (
          <Discount> {formatCurrency(discount)} </Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Modal>
            <Modal.Open opens="edit-cabin">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens="delete-cabin">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
            <button disabled={isCreating} onClick={handleDuplicateCabin}>
              <HiDocumentDuplicate />
            </button>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
