import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { useSelector } from "react-redux";
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = (props) => {

    

    const catId = props.navigation.getParam('categoryId');
    const availableMeals = useSelector(state => state.meals.filteredMeals)

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >=0
    )

    if(displayedMeals.length === 0)
    {
        return(
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters?</DefaultText>
            </View>
        )
    }

    return (
        <MealList 
            listData={displayedMeals} 
            navigation={props.navigation}
        />
    )
}

CategoryMealScreen.navigationOptions = (navigateProps) => {
    const catId = navigateProps.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find((cat) => cat.id === catId)
    return ({
        headerTitle: selectedCategory.title,
    })
}

export default CategoryMealScreen

const styles = StyleSheet.create({
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
