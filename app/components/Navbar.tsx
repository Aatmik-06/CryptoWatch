"use client"


import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';




import Link from 'next/link';
import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import * as React from 'react'


import NavBar from "@/components/ui/navbar"

const menus = [
  {
    id: 1,
    title: 'Home',
    url: '/',
    dropdown: false,
  },
  {
    id: 2,
    title: 'Coins',
    url: '/coin',
    dropdown: false
  },
  {
    id: 3,
    title: "NFT's",
    url: 'nfts',
    dropdown: false
  },
  {
    id: 4,
    title: 'About Us',
    url: '/',
    dropdown: false,
  },
  {
    id: 5,
    title: 'Contact',
    url: '/',
    dropdown: false,
  },
];

export function NavBarDemo() {
  return <NavBar  list={menus} />
}
