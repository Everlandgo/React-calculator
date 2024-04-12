import { React, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  // StatusBar.setBarStyle('light-content');
  StatusBar.setBarStyle('dark');
  const totalwidth = Dimensions.get('window').width * 0.8;
  const buttonwidth = totalwidth / 4;
  // usestate for lear button label
  const [clearbtn, setclearbtn] = useState('AC');
  // usestate to store the equations
  const [equationLine, setEquationLine] = useState('');

  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);

  const buttonPressed = (value) => {
    // checking if the keyvalue is number
    if (!isNaN(value)) {
      handleNumber(value);
      setEquationLine(equationLine + ' ' + value);
    }

    // checking if clear button is pressed, if pressed clear all the usestates
    if (value === 'C' || value === 'AC') {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue(0);
      setReadyToReplace(true);
      setEquationLine('');
      //changing clear button label according to situation
      if (clearbtn === 'C') {
        setclearbtn('AC');
      }
    }

    // checking if the value is operators
    if (['+', '-', '*', '/', '^2', '√', 'log'].includes(value)) {
      setMemoryValue(answerValue);
      if (operatorValue !== 0 && value !== operatorValue) {
        const calculatedval = calculateEquals();
        setMemoryValue(calculatedval);
      }
      setReadyToReplace(true);
      setOperatorValue(value);
      setEquationLine(equationLine + ' ' + value);
    }

    if (value === '=') {
      const resultval = calculateEquals();
      setAnswerValue(resultval);
      setMemoryValue(0);
      setReadyToReplace(true);
      setclearbtn('AC');
      setEquationLine(equationLine);
    }
    if (value === 'π') {
      if (answerValue == 0) {
        setAnswerValue(3.14);
      } else {
        setAnswerValue(answerValue * 3.14);
      }
      setEquationLine(equationLine + 'π');
    }

    if (value === '.') {
      setAnswerValue(answerValue + '.');
      setEquationLine(equationLine + '.');
    }

    if (value === '+/-') {
      negativeval = answerValue * -1;
      setAnswerValue(negativeval);
      setEquationLine(negativeval);
    }

    if (value === '%') {
      const storage = answerValue * 0.01;
      setAnswerValue(storage.toFixed(3));
      setEquationLine(equationLine + '%');
    }
  };
  const calculateEquals = () => {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);
    let calculated = 0;

    switch (operatorValue) {
      case '+':
        calculated = previous + current;

        break;
      case '-':
        calculated = previous - current;

        break;
      case '*':
        calculated = previous * current;

        break;
      case '/':
        calculated = previous / current;

        break;
      case '^2':
        if (previous !== 0) {
          calculated = previous * previous;
        }
        break;
      case '√':
        if (previous !== 0) {
          calculated = previous * Math.sqrt(current);
        } else {
          calculated = Math.sqrt(current);
        }
        break;

      default:
        break;
    }
    calculated = calculated.toFixed(2);
    return calculated;
  };
  const handleNumber = (value) => {
    if (readyToReplace) {
      setAnswerValue(value);
      setReadyToReplace(false);
      setclearbtn('C');
    } else {
      setAnswerValue(answerValue + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.innerContainer, { width: totalwidth + 40 }]}>
        <Text style={[styles.equationline]}>{equationLine}</Text>
        <Text style={styles.calculationVal}>{answerValue}</Text>
      </View>

      {/* extra row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.extraRow, { width: totalwidth / 3 }]}
          onPress={() => buttonPressed('π')}>
          <Text style={[styles.buttonText, { fontSize: 25 }]}>{'\u03C0'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.extraRow, { width: totalwidth / 3 }]}
          onPress={() => buttonPressed('√')}>
          <Text style={[styles.buttonText, { fontSize: 25 }]}>{'\u221A'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.extraRow, { width: totalwidth / 3 }]}
          onPress={() => buttonPressed('^2')}>
          <Text style={[styles.buttonText, { fontSize: 25 }]}>x{'\u00B2'}</Text>
        </TouchableOpacity>
      </View>
      {/* first row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.firstRow,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('C')}>
          <Text style={styles.buttonText}>{clearbtn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.firstRow,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('+/-')}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.firstRow,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.lastColumn,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>

      {/* second row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.lastColumn,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('*')}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
      </View>

      {/* third row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.lastColumn,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* fourth row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.lastColumn,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* fifth row */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            { width: totalwidth / 2 + 10, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: buttonwidth, height: buttonwidth }]}
          onPress={() => buttonPressed('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.lastColumn,
            { width: buttonwidth, height: buttonwidth },
          ]}
          onPress={() => buttonPressed('=')}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F5FBEF',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    border: 5,
  },
  equationline: {
    color: 'grey',
    textAlign: 'right',
    marginBottom: 50,
    fontSize: 30,
  },
  calculationVal: {
    color: '#221D23',
    fontSize: 70,
    marginRight: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#a9def9',
    borderRadius: 100,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 35,
    color: 'black',
  },
  firstRow: {
    backgroundColor: 'lightyellow',
    color: 'black',
  },
  lastColumn: {
    backgroundColor: '#CBC5EA',
    color: 'white',
  },
  extraRow: {
    backgroundColor: '#B3DEC1',
    height: 35,
  },
});
