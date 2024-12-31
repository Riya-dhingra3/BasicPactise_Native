import { SafeAreaView } from "react-native-safe-area-context";
import Todos from "./Todos";
import { useState } from "react";

type Props = {}
 
function index({}: Props) {
  return (
    <SafeAreaView>
        <Todos />
    </SafeAreaView>
  )
};

export default index;