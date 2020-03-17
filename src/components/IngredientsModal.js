import React from 'react';
import { Modal, Fieldset, Checkbox } from '@react95/core/dist';

const IngredientsModal = ({
  allIngredients,
  toggleFilterModal,
  setAllIngredients,
}) => {
  return (
    <Modal
      width={window.innerWidth}
      height={window.innerHeight - 30}
      style={{ top: 0 }}
      icon="bat_exec"
      title="Filter"
      closeModal={() => toggleFilterModal(false)}
      buttons={[{ value: 'Filter', onClick: () => toggleFilterModal(false) }]}
    >
      <Fieldset legend="Ingredients">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {allIngredients.map(({ name, checked }) => (
            <div
              key={name}
              style={{
                width: '50%',
              }}
            >
              <Checkbox
                checked={checked}
                onClick={() => {
                  const changedIngredients = allIngredients.map(i =>
                    i.name === name ? { name, checked: !i.checked } : i,
                  );
                  setAllIngredients(changedIngredients);
                }}
              >
                {name}
              </Checkbox>
            </div>
          ))}
        </div>
      </Fieldset>
    </Modal>
  );
};

export default IngredientsModal;
