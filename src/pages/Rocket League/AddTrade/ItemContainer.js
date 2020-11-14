import React, { useState, useRef, useEffect } from "react";
import styles from "./ItemContainer.module.css";
import useComponentSize from '@rehooks/component-size';
import { FixedSizeList } from 'react-window';

function ItemContainer({ items, ...props }) {
  const [rows, setRows] = useState([])
  const container = useRef()
  const size = useComponentSize(container)
  const { height, width } = size
  const [itemsPerRow, setItemsPerRow] = useState(3)
  //Calculate Items per Row on Container Resize
  useEffect(() => {
    setItemsPerRow(Math.floor(width / 100) || 3)
  }, [width])
  //Create Rows
  useEffect(() => {
    setRows(items.reduce((acc, item, index) => {
      acc[Math.floor(index / itemsPerRow)] = [...(acc[Math.floor(index / itemsPerRow)] || []), item]
      return acc;
    }, []))
  }, [items, itemsPerRow])
  const Row = ({ index, style }) => (
    <div className={styles.row} style={style}>
      {rows[index]}
    </div>
  )
  return (
    <div ref={container} className={styles.container}>
      <FixedSizeList
        {...props}
        items={rows}
        itemSize={(width / itemsPerRow + 17)}
        height={height}
        width="100%"
        itemCount={rows.length}
        className={styles.scroller}
        style={{ "--itemsPerRow": itemsPerRow }}
      >
        {Row}
      </FixedSizeList>
    </div>
  )
}

export default ItemContainer