import styled from '@emotion/styled';

import { ChooserWidget } from '../../chooser-widget.tsx';

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 15px;
  width: 60%;
  padding-left: 14px;
  @media (max-width: 800px) {
    width: 70%;
  }
`;
const InnerContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  width: 100%;
  padding: 20px;

  @media (max-width: 670px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 25px;
`;

interface ComponentContentProps {
  header: any;
  schoolYears: { items: any[]; meta: any[] };
}
export function ComponentContent({ header, schoolYears }: ComponentContentProps) {
  return (
    <Content>
      <Center>
        {header}
        <InnerContent>
          {schoolYears &&
            schoolYears.items.map((item, index) => (
              <div key={index}>
                <ChooserWidget item={item} index={index} />
              </div>
            ))}
        </InnerContent>
      </Center>
    </Content>
  );
}
