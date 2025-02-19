import { Box, Tabs, Table, Icon } from '../components';

export const Achievement = props => {
  const {
    name,
    desc,
    icon_class,
    value,
  } = props;
  return (
    <tr key={name}>
      <td style={{'padding': '6px'}}>
        <Box className={icon_class} />
      </td>
      <td style={{'vertical-align': 'top'}}>
        <h1>{name}</h1>
        {desc}
        <Box
          color={value ? "good" : "bad"}
          content={value ? "Unlocked" : "Locked"} />
      </td>
    </tr>);
};

export const Score = props => {
  const {
    name,
    desc,
    icon_class,
    value,
  } = props;
  return (
    <tr key={name}>
      <td style={{'padding': '6px'}}>
        <Box className={icon_class} />
      </td>
      <td style={{'vertical-align': 'top'}}>
        <h1>{name}</h1>
        {desc}
        <Box
          color={value > 0 ? "good" : "bad"}
          content={value > 0 ? "Earned " + value + " times" : "Locked"} />
      </td>
    </tr>);
};

export const Achievements = props => {
  const { state } = props;
  const { config, data } = state;
  const { ref } = config;
  return (
    <Tabs>
      {data.categories.map(category => (
        <Tabs.Tab
          key={category}
          label={category}>
          <Box as="Table">
            {data.achievements
              .filter(x => x.category === category)
              .map(achievement => {
                if (achievement.score) {
                  return (<Score
                    name={achievement.name}
                    desc={achievement.desc}
                    icon_class={achievement.icon_class}
                    value={achievement.value} />);
                }
                else {
                  return (<Achievement
                    name={achievement.name}
                    desc={achievement.desc}
                    icon_class={achievement.icon_class}
                    value={achievement.value} />);
                }
              })}
          </Box>
        </Tabs.Tab>
      ))}
      <Tabs.Tab
        label={"High Scores"}>
        <Tabs vertical>
          {data.highscore.map(highscore => {
            return (
              <Tabs.Tab key={highscore.name} label={highscore.name}>
                <Table>
                  <Table.Row className="candystripe">
                    <Table.Cell color="label" textAlign="center">#</Table.Cell>
                    <Table.Cell color="label" textAlign="center">Key</Table.Cell>
                    <Table.Cell color="label" textAlign="center">Score</Table.Cell>
                  </Table.Row>
                  { Object.keys(highscore.scores).map((key, index) => {
                    return (
                      <Table.Row className="candystripe" key={key} m={2}>
                        <Table.Cell color="label" textAlign="center">{index+1}</Table.Cell>
                        <Table.Cell color={key === data.user_ckey ? "green" : null} textAlign="center">
                          {(index === 0 && <Icon name="crown" color="gold" mr={2} />)}
                          {key}
                          {(index === 0 && <Icon name="crown" color="gold" ml={2} />)}
                        </Table.Cell>
                        <Table.Cell textAlign="center">{highscore.scores[key]}</Table.Cell>
                      </Table.Row>);
                  })}
                </Table>
              </Tabs.Tab>);
          })}
        </Tabs>
      </Tabs.Tab>
    </Tabs>
  );
};
