import React from "react";
import PropTypes from "prop-types";

function FormattedList({ items, emptyText }) {
  // Ensure items is always an array
  if (!Array.isArray(items) || items.length === 0) {
    return <> {emptyText} </>;
  }

  if (items.length === 1) return <>{items[0]}.</>;

  const last = items[items.length - 1];
  return (
    <>
      {items.slice(0, -1).join(", ")}, and {last}.
    </>
  );
}

FormattedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  emptyText: PropTypes.string
};

FormattedList.defaultProps = {
  items: [],
  emptyText: "None."
};

export default FormattedList;
