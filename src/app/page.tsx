"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { api, getAllKeys } from "@/utils/api";
import Image from "next/image";
import { Gallery } from "./gallery";

export default function Home() {
  const [allKeys, setAllKeys] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedKeys = await getAllKeys();
        setAllKeys(fetchedKeys);
      } catch (error) {
        console.error("Failed to fetch keys:", error);
      }
    })();
  }, []);
  return (
    <main className={styles.main}>
      <div>
        <Gallery imagesSrc={allKeys} />
      </div>
    </main>
  );
}
