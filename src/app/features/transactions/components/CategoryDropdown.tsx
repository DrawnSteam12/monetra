import { useState, useRef, useEffect } from "react";

type CategoryItem = {
  value: string;
  icon: React.ReactNode;
};

type CategoryDropdownProps = {
  categories: CategoryItem[];

  value: string;

  onChange: (value: string) => void;

  placeholder?: string;

  error?: boolean;
};

const CategoryDropdown = ({
  categories,
  value,
  onChange,
  placeholder = "Select Category",
  error = false,
}: CategoryDropdownProps) => {
  const [open, setOpen] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const selectedCategory =
    categories.find(
      (item) =>
        item.value === value,
    );

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={
        error
          ? "category-dropdown error-input"
          : "category-dropdown"
      }
    >
      <button
        type="button"
        className="category-dropdown-trigger"
        onClick={() =>
          setOpen(!open)
        }
      >
        <div className="category-dropdown-selected">
          {selectedCategory ? (
            <>
              <span className="category-dropdown-icon">
                {
                  selectedCategory.icon
                }
              </span>

              <span>
                {
                  selectedCategory.value
                }
              </span>
            </>
          ) : (
            <span className="category-dropdown-placeholder">
              {placeholder}
            </span>
          )}
        </div>

        <span className="category-dropdown-arrow">
          ▼
        </span>
      </button>

      {open && (
        <div className="category-dropdown-menu">
          {categories.map(
            (category) => (
              <button
                key={
                  category.value
                }
                type="button"
                className="category-dropdown-item"
                onClick={() => {
                  onChange(
                    category.value,
                  );

                  setOpen(
                    false,
                  );
                }}
              >
                <span className="category-dropdown-icon">
                  {
                    category.icon
                  }
                </span>

                <span>
                  {
                    category.value
                  }
                </span>
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;