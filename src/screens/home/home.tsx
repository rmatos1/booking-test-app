import { BookingForm, NavBar, PageTitle, TextWrapper } from '../../components';
import { Container, Wrapper } from './home.styles';
import { useHomeHelper } from './homeHelper.hook';

export const Home = () => {
  const { onFormSubmit } = useHomeHelper();

  return (
    <Wrapper>
      <NavBar backgroundColor="rgba(0, 0, 0, 0.4)" />
      <Container>
        <TextWrapper $color="#fff" $isAlignedLeft>
          <PageTitle>Welcome to Royal Hotel</PageTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            gravida sollicitudin turpis id posuere
          </p>
        </TextWrapper>

        <BookingForm onFormSubmit={onFormSubmit} title="Book Your Stay" />
      </Container>
    </Wrapper>
  );
};
