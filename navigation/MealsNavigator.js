import React, { Component } from "react";
import {Text} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from "react-navigation-tabs";
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import {Platform} from 'react-native'
import Colors from '../constants/Colors'
import FavoritesScreen from "../screens/FavoritesScreen";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator}  from "react-navigation-material-bottom-tabs";
import FiltersScreen from "../screens/FiltersScreen";
import {createDrawerNavigator} from "react-navigation-drawer";

const defaultNavSettings = {
    headerStyle: {
        backgroundColor: Platform.OS==='android' ? Colors.primaryColor : 'white'
    },
    headerTextStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS==='ios' ? Colors.primaryColor : 'white',
    headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        // navigationOptions: {
        // }
    },
    CategoryMeals: {
        screen: CategoryMealScreen
    },
    MealDetail: MealDetailScreen
},
{
    defaultNavigationOptions: defaultNavSettings
});

const favNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultNavSettings
})

const tabConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>, 
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: favNavigator,
        navigationOptions: {
            tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>, 
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
        }
    },
}

const MealFavTabNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabConfig,{
        activeTintColor: 'white',
        shifting: true
    })
    : createBottomTabNavigator(tabConfig, {
        tabBarOptions :{
            labelStyle:{
                fontFamily: 'open-sans'
            },
            activeTintColor: Colors.accentColor
        }
    })

const FilterNavigator = createStackNavigator({
    Filters: FiltersScreen
}, 
{
    defaultNavigationOptions: defaultNavSettings
}) 

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FilterNavigator

}, 
{
    contentOptions : {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator); 