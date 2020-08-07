import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudyTabs from './StudyTabs';

// aula 04 54:00

const { Navigator, Screen } = createStackNavigator();

// importando as telas
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';

function AppStack() {
    return (
        <NavigationContainer>
            {/* aula 04 59:00 */}
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;