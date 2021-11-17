import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";


export default class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            movie_details: {}
        }
    }
    componentDidMount() {
        this.getmovies();
    }
    getduration(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours} hrs ${minutes} mins`;
    }
    getmovies = () => {
        const url = "http://127.0.0.1:5000/get-movies";
        axios.get(url)
            .then(response => {
                var details = response.data.data;
                details["duration"] = this.getduration(details.duration);
                thi.seState({ movie_details: details })
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    likedMovie = () => {
        const url = "http://127.0.0.1:5000/liked-movies";
        axios.get(url)
            .then(response => {
                this.getmovies();
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    unlikedMovie = () => {
        const url = "http://127.0.0.1:5000/unliked-movies";
        axios.get(url)
            .then(response => {
                this.getmovies();
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    render() {
        const { movie_details } = this.state;
        if (movie_details.poster_link) {
            const { poster_link,
                title,
                release_date,
                duration,
                overview,
                rating } = movie_details
        }
        return (
            <View style={styles.conatiner}>
                <View style={styles.headercontainer}>
                    <Header centerComponent={{
                        text: "Movie Recommendation",
                        style: styles.headertitle
                    }}
                        containerStyle={{ flex: 1 }}
                    rightComponent={{ icon:"movie-search-outline",
                type:"MaterialCommunityIcons",onPress:()=>{
                    this.props.navigation.navigate("Reccomended_Movies")
                }}}
                    />
                </View>
                <View>
                    <View>
                        <Image source={{ uri: poster_link }} style={styles.posterlink} />
                    </View>
                    <View style={styles.details}>
                        <Text>{title}</Text>
                        <Text>{rating}</Text>
                        <Text>{duration}</Text>
                        <Text>{overview}</Text>
                        <Text>{release_date}</Text>

                    </View>
                    <View><TouchableOpacity onPress={()=>{this.likedMovie()}}><Icon name={"like2"} type={'AntDesign'} style={{ height: 20, width: 20 }} /></TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.unlikedMovie()}}><Icon name={"dislike2"} type={'AntDesign'} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: "black"
    },
    headercontainer: {
        flex: 0.1,
        backgroundColor: "black"
    },
    headertitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: RFValue(18)
    },
    posterlink: {
        width: "60%",
        height: "90%",
        resizeMode: "stretch",
        borderRadius: RFValue(30),
        marginHorizontal: RFValue(10)
    },
    details: {
        color: "white"
    }
})