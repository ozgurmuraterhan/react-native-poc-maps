import React from 'react'
import { ScrollView, Image, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

import RoundedButton from './RoundedButton'
import styles from './Styles/NewProblemFormStyles'

import Colors from '../Themes/Colors';

import { Container, Content, Footer, FooterTab, Button, Icon, Text, Spinner, Form, Input, Item, Label, Badge, Textarea } from 'native-base';

export default class NewProblemForm extends React.Component {
  renderButton = () => {
    const { loading, submitProblem } = this.props;
    if (loading) {
      return (
        <Button full style={{ backgroundColor: Colors.cityInputColor }}>
          <Spinner color='white' />
        </Button>
      );
    } else {
      return (
        <Button full style={{ backgroundColor: Colors.cityInputColor }} onPress={submitProblem}>
          <Text style={{ color: 'white', fontSize: 16 }}>Bevestigen</Text>
        </Button>
      );
    }
  }

  render() {
    const { startPickingOnMap, onInputChange, submitProblem, address, title, description, abortAddProblem, showErrors, imageSource, startPickingImage, deleteImage } = this.props;
    return (
      <Container>
        <Content padder>
          <Button transparent onPress={abortAddProblem}>
            <Icon style={{ color: Colors.cityInputColor }} name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} />
          </Button>
          <Form>

            <View style={styles.itemContainer}>
              <Label style={styles.textareaLabel}>Adres</Label>
              <Input
                style={[styles.textStyle, styles.addressInput]}
                onChangeText={text => { onInputChange(text, 'address') }}
                value={address}
                maxLength={200}
                multiline
              />
              <TouchableOpacity style={styles.editIcon} onPress={() => startPickingOnMap()}>
              <Icon style={{ color: Colors.cityInputColor }} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} />
              </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
              <Label style={styles.textareaLabel}>Titel</Label>
              <Input
                style={styles.textStyle}
                onChangeText={text => { onInputChange(text, 'title') }}
                value={title}
                focus
                maxLength={50}
                multiline
              />
            </View>

            <View style={styles.itemContainer}>
              <Label style={styles.textareaLabel}>Beschrijving</Label>
              <Input
                style={styles.textStyle}
                onChangeText={text => { onInputChange(text, 'description') }}
                value={description}
                maxLength={5000}
                multiline
              />
            </View>

            <View style={styles.imageAddSection}>
              {!imageSource &&
                <Button style={{ backgroundColor: Colors.cityInputColor }} onPress={startPickingImage}>
                  <Icon style={{ marginRight: 0 }} name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'} />
                  <Text>Foto toevoegen</Text>
                </Button>
              }
              {!!imageSource &&
                <View>
                  <Image source={{ uri: imageSource.uri }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.deleteImageContainer} onPress={deleteImage}>
                    <Badge style={styles.deleteImageButton}>
                      <Text>X</Text>
                    </Badge>
                  </TouchableOpacity>
                </View>
              }
            </View>

          </Form>
        </Content>

        <Footer>
          <FooterTab>
            {this.renderButton()}
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
