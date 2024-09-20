'use client'

import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"

import Link from 'next/link'

import { useEffect } from "react"
import axios from "axios"
import {useRouter } from "next/navigation"
import Dashboard from "@/components/Dashboard"


export default function LandingPage() {





  return (
    <div className="min-h-screen bg-gray-950 text-white">
     <Dashboard />

    
    </div>
  )
}
