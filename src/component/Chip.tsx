import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import "../ChipComponent.css";

interface Chip {
  id: number;
  label: string;
}
const items: string[] = [
  "John Doe",
  "Jane Smith",
  "Nick Giannopoulos",
  "Alice Johnson",
  "Alison George",
  "Berkley Hudson",
  "Jhon wick",
];

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>(items);
  const [openDailog, setOpenDailog] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setOpenDailog(true);
    const tempArray = items.filter((item) => {
      if (!JSON.stringify(chips).includes(item)) return true;
    });
    const filtered = tempArray.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleChipClick = (item: string) => {
    console.log({ item });
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item }]);
    setInputValue("");
    setFilteredItems(
      filteredItems.filter((filteredItem) => filteredItem !== item)
    );
  };

  const handleChipRemove = (id: number) => {
    const removedChip = chips.find((chip) => chip.id === id);
    if (removedChip) {
      setChips(chips.filter((chip) => chip.id !== id));
      setFilteredItems([...filteredItems, removedChip.label]);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <center>
      <div
        style={{
          fontSize: 30,
          color: "#800080",
          fontFamily: "Times New Roman",
        }}
      >
        Pick users
      </div>
      <div className="chip-container-wrapper">
        <div
          className="chip-container"
          onClick={() => {
            inputRef.current?.focus();
            setOpenDailog(!openDailog);
          }}
        >
          {/* chips  */}
          {chips.map((chip) => (
            <div key={chip.id} className="chip">
              {chip.label}
              <button
                className="remove"
                onClick={() => handleChipRemove(chip.id)}
              >
                X
              </button>
            </div>
          ))}
          {/* input Element  */}

          <div
            className={inputValue?.length ? "" : "input-placeholder-wrapper"}
          >
            <span className={inputValue?.length ? "" : "input-placeholder"}>
              {inputValue?.length ? inputValue : "Type user name.."}
            </span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="input"
          />
        </div>

        {openDailog && (
          <ul className="item-list">
            {filteredItems.map((item) => (
              <li key={item} onClick={() => handleChipClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </center>
  );
};

export default ChipComponent;
