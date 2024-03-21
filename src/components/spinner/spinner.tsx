import { CenterContent, PageContainer as Container } from '../../pages/common-styles/common-styles.ts';

interface SpinnerProps {
  SpinnerComponent: any;
  color: string;
}
export function Spinner({ SpinnerComponent, color }: SpinnerProps) {
  return (
    <Container>
      <CenterContent>
        <SpinnerComponent color={color} />
      </CenterContent>
    </Container>
  );
}
