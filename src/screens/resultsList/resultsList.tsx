import { svg } from "../../assets";
import {
  BookingForm,
  Button,
  Image,
  ImgContainer,
  ListContainer,
  ListItem,
  NavBar,
  TwoColumnsGrid,
} from "../../components";
import { ConfirmYourBookingDrawer } from "../../drawers";
import {
  BedroomName,
  ContainerPic,
  Description,
  PriceGroup,
  PriceText,
  NumberNightsContainer,
} from "./resultsList.styles";
import { useResultsListHelper } from "./resultsListHelper.hook";

/**
 * page that shows the available bedrooms according to the search criteria
 */
export const ResultsList = () => {
  const {
    onBookingClick,
    isDrawerVisible,
    results,
    onFormSubmit,
    onCloseDrawer,
    selectedBedroom,
  } = useResultsListHelper();

  /**
   * adds a "s" if there is more than one bed in the bedroom
   */
  const BedsListItem = ({
    beds,
    typeOfBed,
  }: {
    beds: number;
    typeOfBed: string;
  }) => {
    return (
      <li>
        {beds} {typeOfBed} bed{beds > 1 ? "s" : ""}
      </li>
    );
  };

  return (
    <>
      <NavBar />

      <TwoColumnsGrid>
        <BookingForm onFormSubmit={onFormSubmit} />

        <ListContainer>
          <NumberNightsContainer>
            <span>
              Availability from {results.checkIn} to {results.checkOut}
            </span>

            <span>
              {results.numberOfNights} night
              {results.numberOfNights > 1 ? "s" : ""}
            </span>
          </NumberNightsContainer>

          {results.bedrooms.length ? (
            <>
              {results.bedrooms.map((item) => (
                <ListItem key={item.number} data-testid="bedroom-info">
                  <ContainerPic>
                    <Image
                      height="100%"
                      data-testid="bedroom-pic"
                      imgSrc={item.img}
                      alt={`bedroom${item.number} pic`}
                    />
                  </ContainerPic>

                  <Description>
                    <BedroomName data-testid="bedroom-name">
                      Bedroom {item.number}
                    </BedroomName>

                    <ul data-testid="bedroom-details">
                      <li>{item.type} bedroom</li>
                      {item.beds.double && (
                        <BedsListItem
                          beds={item.beds.double}
                          typeOfBed="double"
                        />
                      )}

                      {item.beds.single && (
                        <BedsListItem
                          beds={item.beds.single}
                          typeOfBed="single"
                        />
                      )}
                    </ul>
                  </Description>

                  <PriceGroup>
                    <span>$ {item.dailyPrice} / night</span>

                    <PriceText data-testid="bedroom-total-price">
                      $ {item.totalPrice}
                    </PriceText>

                    <Button
                      data-testid="book-now"
                      $height={40}
                      $fontSize={14}
                      $backgroundColor="rgb(245, 172, 36)"
                      onClick={() => onBookingClick(item.number)}
                    >
                      Book Now
                    </Button>
                  </PriceGroup>
                </ListItem>
              ))}
            </>
          ) : (
            <ImgContainer data-testid="no-results-content">
              <Image imgSrc={svg.emptyResults} alt="no results image" />

              <p>
                We didn't find any available bedrooms with this search criteria
              </p>
            </ImgContainer>
          )}
        </ListContainer>
      </TwoColumnsGrid>

      <ConfirmYourBookingDrawer
        isDrawerVisible={isDrawerVisible}
        onCloseDrawer={onCloseDrawer}
        selectedBedroom={selectedBedroom}
      />
    </>
  );
};
