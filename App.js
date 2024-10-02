import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={!taskTitle.trim()}
      />
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} setTasks={setTasks} tasks={tasks} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const TaskCard = ({ task, setTasks, tasks }) => {
  const toggleStatus = () => {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, status: !t.status } : t))
    );
  };

  const deleteTask = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <View style={styles.taskCard}>
      <Text style={{ textDecorationLine: task.status ? 'line-through' : 'none' }}>
        {task.title}
      </Text>
      <TouchableOpacity onPress={toggleStatus}>
        <Text>{task.status ? 'Done' : 'Due'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteTask}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  taskCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
