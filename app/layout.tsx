"use client"
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import store, { AppState, useAppDispatch, useAppSelector } from '@src/store'
import '@styles/globals.css'
import { Metadata } from 'next'
import { fetchUserData } from '@src/features/auth/store/authThunks'
import { usePathname } from 'next/navigation'
import { SpinnerComponent } from '../src/shared/components/SpinnerComponent';


export const metadata: Metadata = {
  title: '1Hotel California',
  description: 'Hotel mas lujoso de la ciudad',
  // icons: [
  //   {
  //     href: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAABOU1QABwgHAB+4hwAAw/8Ap7K1AA8PDwAVFxYACgoKACAkIwBWlagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiOQAJkyIiIRE5AAmTiIiBETkACZOIiIEROZmZk4iIgRE5SUmTiIiBETmZmZOIiIEROUlJk4iIgRE5mZmTiIiBETlJSZOIiIEROZmZk4iIgRE5SUmTiIiBETmZmZOIiIEROUlJk4iIgREzMzMziIiBERERF1aIiIEREREXVoiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  //     sizes: 'any',
  //     url: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAABOU1QABwgHAB+4hwAAw/8Ap7K1AA8PDwAVFxYACgoKACAkIwBWlagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIiOQAJkyIiIRE5AAmTiIiBETkACZOIiIEROZmZk4iIgRE5SUmTiIiBETmZmZOIiIEROUlJk4iIgRE5mZmTiIiBETlJSZOIiIEROZmZk4iIgRE5SUmTiIiBETmZmZOIiIEROUlJk4iIgREzMzMziIiBERERF1aIiIEREREXVoiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  //     type: 'image/x-icon',
  //     rel: 'icon',
  //   }
  // ]
}

interface Props {
  // title?: string,
  // description?: string,
  children: React.ReactNode,
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <LayoutState>
            {children}
          </LayoutState>
        </Provider>
      </body>
    </html>
  )
}

const LayoutState = ({children}: Props) => {

  const { isAuthenticated } = useAppSelector( state =>state.auth )
  
  const dispatch = useAppDispatch()
  const pathname = usePathname();

  const pathsWithoutNav = ['auth']
  const includeNavPath = pathsWithoutNav.some(path => !pathname.includes(path))


  return (
    <main className='bg-gray-100 dark:bg-gray-900 mx-auto'>
      
      {children}
    </main>
  )
}