import { Clipboard, Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { colors } from './globalStyles';

export function validateWhatsApp(wpp) {
  const re = /(\d{11})/;
  if (re.test(wpp)) {
    return true;
  }
  showMessage({
    message:
      'Whatsapp no formato incorreto! Por favor digite somente números, inclua o seu DDD no começo, e não esqueça do digito 9!',
    type: 'info',
    backgroundColor: colors.red,
    position: { top: 330, left: 20, right: 20 },
    style: { alignItems: 'center' },
  });
  return false;
}

export function checkSpace(string) {
  const re = /\s/g;
  if (re.test(string)) {
    return true;
  }
  return false;
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(email).toLowerCase())) {
    return true;
  }
  showMessage({
    message: 'E-mail no formato incorreto!',
    type: 'info',
    backgroundColor: colors.red,
    position: { top: 330, left: 20, right: 20 },
    style: { alignItems: 'center' },
  });
  return false;
}

export function clearWpp(wpp) {
  let temp = String(wpp);

  temp = temp.replace(' ', '');
  temp = temp.replace('(', '');
  temp = temp.replace(')', '');

  return temp;
}

export function copyToClipboard(text) {
  Clipboard.setString(text);
  showMessage({
    message: 'Copiado para a Área de Transferência',
    type: 'info',
    backgroundColor: colors.green,
    style: { alignItems: 'center' },
  });
}

export function sendWhatsapp(wpp) {
  Linking.openURL(`whatsapp://send?phone=+55${wpp}`);
}

export function filterMembers(allMembers, name, team, checkCar) {
  const newData = allMembers.filter((member) => {
    const memberData = `${member.name.toUpperCase()} ${member.realName.toUpperCase()}`;
    const textData = name.toUpperCase();
    if (checkCar === false) {
      if (team === 'all') return memberData.indexOf(textData) > -1;

      return (
        memberData.indexOf(textData) > -1 &&
        member.team.name.toUpperCase() === team.toUpperCase()
      );
    }
    if (team === 'all')
      return memberData.indexOf(textData) > -1 && member.hasCar === 1;

    return (
      memberData.indexOf(textData) > -1 &&
      member.team.name.toUpperCase() === team.toUpperCase() &&
      member.hasCar === 1
    );
  });
  return newData;
}
