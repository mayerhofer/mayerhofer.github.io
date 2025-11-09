import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/*
 Dropdown component
 Props:
 - options: array of strings or { value, label } objects
 - includeEmpty: boolean, when true an empty/null option is prepended
 - emptyLabel: label for the empty option (default "None")
 - placeholder: shown when nothing selected (default "Select...")
 - selected: optional controlled selected value
 - onChange: function(value) called when selection changes
*/

function Dropdown({
    options = [],
    includeEmpty = false,
    emptyLabel = "None",
    placeholder = "Select...",
    selected: controlledSelected,
    onChange,
}) {
    const [open, setOpen] = useState(false);
    const [uncontrolledSelected, setUncontrolledSelected] = useState(null);
    const isControlled = controlledSelected !== undefined;
    const selectedValue = isControlled ? controlledSelected : uncontrolledSelected;
    const rootRef = useRef(null);

    // normalize options to objects { value, label } where label can be a React node
    const normalizedOptions = (options || []).map((opt) => {
        if (opt && typeof opt === "object" && "value" in opt) {
            // explicit { value, label } objects
            return { value: opt.value, label: opt.label ?? String(opt.value) };
        } else if (React.isValidElement(opt)) {
            // React element: use element as both value and label so it can be rendered
            return { value: opt, label: opt };
        } else {
            // primitives (string, number, etc.)
            return { value: opt, label: String(opt) };
        }
    });

    const menuOptions = includeEmpty
        ? [{ value: null, label: emptyLabel }, ...normalizedOptions]
        : normalizedOptions;

    useEffect(() => {
        function handleOutside(e) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    function handleToggle() {
        setOpen((v) => !v);
    }

    function handleSelect(value) {
        if (!isControlled) setUncontrolledSelected(value);
        if (onChange) onChange(value);
        setOpen(false);
    }

    const currentLabel =
        menuOptions.find((o) => o.value === selectedValue)?.label ?? placeholder;

    // basic inline styles to keep component self-contained
    const styles = {
        placeholder: {
            color: "#666",
        },
        caret: {
            marginLeft: 8,
            transition: "transform 0.15s",
        },
        caretOpen: {
            transform: "rotate(180deg)",
        },
    };

    return (
        <div className="dropdown-container" ref={rootRef}>
            <div
                role="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                tabIndex={0}
                onClick={handleToggle}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggle();
                    } else if (e.key === "Escape") {
                        setOpen(false);
                    }
                }}
                className="dropdown-control"
            >
                <div style={selectedValue == null ? { ...styles.placeholder } : null}>
                    {currentLabel}
                </div>
                {open && (
                <div role="listbox" className="dropdown-menu">
                    {menuOptions.map((opt, idx) => (
                        <div
                            key={`option-${idx}-${String(opt.value)}`}
                            role="option"
                            aria-selected={opt.value === selectedValue}
                            onClick={() => handleSelect(opt.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleSelect(opt.value);
                                }
                            }}
                            tabIndex={0}
                            className="dropdown-item"
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.shape({ value: PropTypes.any, label: PropTypes.node }),
        ])
    ).isRequired,
    includeEmpty: PropTypes.bool,
    emptyLabel: PropTypes.node,
    placeholder: PropTypes.string,
    selected: PropTypes.any,
    onChange: PropTypes.func,
};

export default Dropdown;
