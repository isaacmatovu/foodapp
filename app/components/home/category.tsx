import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import CategorySelection from "./categorySelection";
import CategorySelectionDisplay from "./CategorySelectionDisplay";

interface Categoty {
  name: string;
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Junk Food");

  const handleSelectedCategory = useCallback((className: string) => {
    setSelectedCategory(className);
    console.log("item selected");
  }, []);

  const Child1 = useMemo(
    () => <CategorySelection handleSelectedCategory={handleSelectedCategory} />,
    []
  );
  const Child2 = useMemo(
    () => <CategorySelectionDisplay selectedCategory={selectedCategory} />,
    [selectedCategory]
  );
  return (
    <View>
      {Child1}
      {/* subcategories */}
      {Child2}
    </View>
  );
};

export default Category;
