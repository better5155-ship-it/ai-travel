'use client'

import { motion } from "framer-motion"

export default function RouteCard({ route }: any) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="my-3 flex justify-center"
    >

      <div className="bg-black/50 border border-white/10 rounded-xl p-4 w-full max-w-md text-center shadow-lg">

        <div className="text-sm text-gray-300 mb-1">
          🚇 이동
        </div>

        <div className="text-lg font-semibold">
          {route.trafficType}
        </div>

        <div className="text-sm text-gray-300 mt-1">
          ⏱ {route.duration}
        </div>

        <div className="text-sm text-gray-300">
          📏 {route.distance}
        </div>

        <div className="mt-2 text-white font-semibold">
          💰 {route.transitFare}
        </div>

        <div className="text-xs text-gray-400">
          🚕 {route.taxiFare}
        </div>

      </div>

    </motion.div>
  )
}