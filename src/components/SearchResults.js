import React from 'react';
import { List, Image, Icon } from 'semantic-ui-react';

function SearchResults({
  results,
  searchValue,
}: { results: Object, searchValue: string }) {
  return (
    <div>
      {(() => {
        if (searchValue.length > 3 && results.length > 3) {
          return (
            <List>
              {results.map((result: Object) => {
                const { trackLabel, id, thumb, uri, title, format } = result;
                return (
                  <List.Item key={id}>
                    <Image avatar floated="left" src={thumb} />
                    <List.Content floated="left">
                      <List.Header>
                        <a href={`https://www.discogs.com${uri}`}>{title}</a>
                        <Icon name="caret down" />
                      </List.Header>
                      {trackLabel &&
                        <List.Description>
                          {trackLabel.length && trackLabel[0]}
                          {' '}
                          /
                          {' '}
                          {format.length && format[0]}
                        </List.Description>}
                    </List.Content>
                    <List.Content floated="right">
                      <Icon
                        name="plus square outline"
                        size="large"
                        color="blue"
                      />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          );
        } else if (searchValue.length > 0 && searchValue.length <= 3) {
          return <h3>No Results</h3>;
        }
        return <h3>Enter a search term</h3>;
      })()}
    </div>
  );
}

export default SearchResults;
