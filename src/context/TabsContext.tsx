import React, { createContext, useContext, useState } from 'react'

const TabsContext = createContext<any>(null)

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('income')
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export function useTabs() {
  return useContext(TabsContext)
}
