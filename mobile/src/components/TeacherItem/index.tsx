import React, { useState } from 'react';

import styles from './styles';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/icons/unfavorite.png';
import whatsappIcon from '../../assets/icons/whatsapp.png';
import api from '../../services/api';

// aula 05 54:00
export interface Teacher {
    id: string;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

// mudar cor do botão favoritado: aula 05 21:20

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    // aula 05 1:08:00 
    const [isFavorited, setIsFavorited] = useState(favorited)


    // aula 05 58:00 whatsapp
    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorite() {

        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];

        if (favorites) {

            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            // remover dos favorites
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            // 1:15:00 splice(), índice e quantos queremos remover 
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false)
        } else {
            // adicionar aos favoritos
            favoritesArray.push(teacher)

            setIsFavorited(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={{ uri: teacher.avatar }}
                    style={styles.avatar}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>

                <Text style={styles.price}>
                    Preço/hora {'  '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {},

                        ]}
                    >

                        {/* <Image source={heartOutlineIcon} /> */}
                        <Image source={unfavoriteIcon} />
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>

            </View>

        </View>
    )

}

export default TeacherItem;