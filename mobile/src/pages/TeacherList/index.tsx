import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
// aula 05 5:00
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

function TeacherList() {
    const [teacher, setTeachers] = useState([])

    // aula 05 1:01:00 AsyncStorage
    const [favorites, setFavorites] = useState<number[]>([])

    // aula 05 33:00 filtros
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    // aula 05 46:00 anotar os dados dos filtros em estados
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            // pode salvar apenas text/json
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                // ter um array de ids de professores, para saber qual usuário já está favoritado
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds)
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites()
    });

    function handleToggleFiltersVisible() {
        // aula 05 39:30
        setIsFilterVisible(!isFilterVisible)
    }

    async function handleFiltersSubmit() {

        loadFavorites()

        console.log({ subject, week_day, time })
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        // para tirar o filtro depois da busca
        setIsFilterVisible(false)
        console.log(response.data)
        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            {/* aula 05 25:00- childrens || headerRight 38:00 + Feather icons  */}
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>
                            Matéria
                    </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={text => setSubject(text)}

                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>

                        </View>
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {teacher.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}

            </ScrollView>

        </View>
    )
}


export default TeacherList;