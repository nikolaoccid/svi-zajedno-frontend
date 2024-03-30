import styled from '@emotion/styled';
import { FaChartLine, FaUsers } from 'react-icons/fa';
import { MdOutlineSportsMartialArts, MdOutlineSportsSoccer } from 'react-icons/md';

const Container = styled.div<{ backgroundColor: string }>`
  display: flex;
  border-radius: 15px;
  align-items: flex-start;
  gap: 10px;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  padding: 20px;
  @media (max-width: 900px) {
    width: 300px;
  }
`;
const Title = styled.span`
  font-family: Axiforma;
  font-weight: 400;
  font-size: 14px;
  color: #696969;
  white-space: nowrap;
`;
const Value = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 24px;
  color: #252424;
`;
const IconCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const widgetType = {
  Users: {
    icon: FaUsers,
    backgroundColor: '#E0E9FF',
  },
  Associate: { icon: MdOutlineSportsSoccer, backgroundColor: '#E4FFE0' },
  Activity: { icon: MdOutlineSportsMartialArts, backgroundColor: '#FFE0E0' },
  Value: { icon: FaChartLine, backgroundColor: '#fec949' },
};
export function DashboardSingleWidget({
  type,
  title,
  value,
  euro = false,
}: {
  type: 'Users' | 'Associate' | 'Activity' | 'Value';
  title: string;
  value: number;
  euro?: boolean;
}) {
  const Icon = widgetType[type].icon;
  return (
    <Container backgroundColor={widgetType[type].backgroundColor}>
      <IconCircle>
        <Icon color={'#ffffff'} size={20} />
      </IconCircle>

      <Content>
        <Title>{title}</Title>
        <Value>
          {value} {euro ? '€' : undefined}
        </Value>
      </Content>
    </Container>
  );
}
