import styled from '@emotion/styled';
import { BsCalendar3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ColorScheme = [
  { backgroundColor: '#FFE0FA', color: '#5F004F' },
  { backgroundColor: '#E0E9FF', color: '#00265F' },
  { backgroundColor: '#FFF8E0', color: '#5F4400' },
  { backgroundColor: '#EAFFE0', color: '#005F31' },
];
const Container = styled.div<{ colorScheme: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 150px;
  height: 150px;
  border-radius: 15px;
  background-color: ${(props) => ColorScheme[props.colorScheme].backgroundColor};
  color: ${(props) => ColorScheme[props.colorScheme].color};

  &:hover {
    background-color: ${(props) => darkenColor(ColorScheme[props.colorScheme].backgroundColor, 15)};
  }

  font-family: Axiforma;
  font-weight: 500;
  font-size: 16px;
`;
const Title = styled.span``;
function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export function ChooserWidget({ item, index }: { item: any; index: number }) {
  const navigate = useNavigate();
  const colorSchemeIndex = index % 4;
  return (
    <Container colorScheme={colorSchemeIndex} onClick={() => navigate(`/${item.startYear}/dashboard`)}>
      <BsCalendar3 size={28} color={ColorScheme[colorSchemeIndex].color} />
      <Title>
        {item.startYear} / {item.endYear}
      </Title>
    </Container>
  );
}
