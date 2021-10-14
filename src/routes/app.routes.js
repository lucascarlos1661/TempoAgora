import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { NewCity } from '../screens/NewCity'
import { CityDetails } from '../screens/CityDetails'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name='Home'
                component={Home}
            />
            <Screen
                name='NewCity'
                component={NewCity}
            />
            <Screen
                name='CityDetails'
                component={CityDetails}
            />

        </Navigator>
    )
}