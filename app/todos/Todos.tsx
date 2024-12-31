import React, {
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
  } from "react";
  import { Button, View, Text, TextInput, FlatList, PixelRatio, Animated } from "react-native";
  import { useNavigation } from "expo-router";
  import { StackNavigationProp } from "@react-navigation/stack";
  import axios from "axios";
  import UserContext from "../context/UserContext";
  
  interface Todo {
    id: number;
    name: string;
  }
  
  interface AddTodoAction {
    type: typeof ACTIONS.ADD_TODO;
    payload: {
      name: string;
    };
  }
  
  interface DeleteTodoAction {
    type: typeof ACTIONS.DELETE_TODO;
    payload: {
      id: number;
    };
  }
  
  interface UpdateTodoAction {
    type: typeof ACTIONS.UPDATE_TODO;
    payload: {
      id: number;
      name: string;
    };
  }
  
  type Action = AddTodoAction | DeleteTodoAction | UpdateTodoAction;
  
  const ACTIONS = {
    ADD_TODO: "add-todo" as const,
    DELETE_TODO: "delete-todo" as const,
    UPDATE_TODO: "update-todo" as const,
  };
  
  function reducer(todos: Todo[], action: Action): Todo[] {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name)];
      case ACTIONS.DELETE_TODO:
        return todos.filter((item) => item.id !== action.payload.id);
      case ACTIONS.UPDATE_TODO:
        return todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, name: action.payload.name }
            : item
        );
      default:
        return todos;
    }
  }
  
  function search(todos: Todo[], name: string): Todo[] {
    return todos.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  function newTodo(name: string): Todo {
    return { id: Date.now(), name: name };
  }
  
  type NavigationProps = {
    sectionlist: undefined;
  };
  
  export default function Todos() {
    const navigation = useNavigation<StackNavigationProp<NavigationProps>>();
    const [todos, dispatch] = useReducer(reducer, []);
    const [text, setText] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:4000/products/trending");
          if (response) {
            const data = response.data;
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
      console.log("Filtered posts");
    }, []);
  
    const handlePress = () => {
      if (text.trim()) {
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: text } });
        setText("");
      }
    };
  
    const handlePressDelete = (id: number) => {
      dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } });
    };
  
    const handleUpdate = (id: number, name: string) => {
      setText(name);
      dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id, name } });
    };
  
    const filteredTodos = useMemo(() => search(todos, searchQuery), [todos, searchQuery]);
    
    const userContext = useContext(UserContext);
    if (!userContext) {
      throw new Error("useContext must be used within a UserContextProvider");
    }
  
    const { user, setUser } = userContext;
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
  
    const timerIdRef = useRef<number | undefined>(undefined);
    const [count, setCount] = useState(0);
    let a = useRef<number>(0);
  
    const setTimerIn = () => {
      if (timerIdRef.current === undefined) {
        timerIdRef.current = window.setInterval(() => {
          setCount((count) => count + 1);
        }, 1000);
      }
    };
  
    const setTimerOut = () => {
      if (timerIdRef.current !== undefined) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = undefined;
      }
    };
  
    const incrementA = () => {
      a.current += 1;
      console.log(a.current);
    };
  
    const handleSubmit = () => {
      setUser({ id: Date.now(), name });
    };
  
    const handlePress1 = () => {
      navigation.navigate("sectionlist");
    };
  
    const handleInput = () => {
      setTimeout(() => {
        console.log("You entered your name");
      }, 3000);
    };
  
    const inputRef = useRef<TextInput | null>(null);
  
    const backgroundColor = useRef(new Animated.Value(0)).current;
  
    const handleFocus = () => {
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  
    const handleBlur = () => {
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
  
    const interpolatedColor = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["white", "red"],
    });
  
    return (
      <View style={{flex:1 }}>
        <View style={{flex:1}}>
          <Text onPress={handlePress1}>Section List</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Todo List</Text>
          <View>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Add todo"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 10,
                paddingHorizontal: 10,
              }}
            />
            <Button title="Add" onPress={handlePress} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Here"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 10,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View>
            <Animated.View style={{ backgroundColor: interpolatedColor }}>
              <TextInput
                ref={inputRef}
                value={name}
                onChangeText={setName}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Add name"
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}
              />
            </Animated.View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Add password"
              secureTextEntry
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 10,
                paddingHorizontal: 10,
              }}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
          <FlatList
            data={filteredTodos}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Button title="Delete" onPress={() => handlePressDelete(item.id)} />
                <Button title="Update" onPress={() => handleUpdate(item.id, item.name)} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Current User</Text>
          {user ? (
            <Text>{`ID: ${user.id}, Name: ${user.name}`}</Text>
          ) : (
            <Text>No user logged in</Text>
          )}
        </View>
        <View>
          <Text>{count}</Text>
          <Button title="start" onPress={() => setTimerIn()} />
          <Button title="stop" onPress={() => setTimerOut()} />
        </View>
        <View>
          <Text>{a.current}</Text>
          <Button title="Increment A" onPress={incrementA} />
        </View>
        <View style={{flex:1}}>
            <Text>I am the second divisioon</Text>
        </View>
      </View>
    );
  }
  