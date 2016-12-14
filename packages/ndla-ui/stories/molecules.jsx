/* eslint-disable no-alert */

import React from 'react';

import { storiesOf } from '@kadira/storybook';
import Tabs from 'ndla-tabs';
import { CC, BY, NC, ND, SA } from 'ndla-licenses';

import { Center, DottedContainer } from './helpers';
import { SiteNav, SiteNavItem, Masthead, MastheadItem, Logo, Pager, Footer, LicenseIconList } from '../src';

const toggle = () => {
  document.querySelector('.c-collate__panel').classList.toggle('c-collate__panel--expanded');
};
storiesOf('Sammensatte moduler', module)
  .add('Logo', () => (
    <Center>
      <section className="c-factbox">

        <h1 className="u-heading">Logo</h1>
        <p>
          Logoen er vårt tydeligste kjennetegn og vårt viktigste verktøy
          for kommunikasjon. Den skal inspirere målgruppen elever og
          lærere i videregående opplæring og gjøre dem nysgjerrige på
          NDLA.
        </p>
        <p>
          Logoen består av navnet NDLA i en spesiell typografi og bør hovedsakelig benyttes sammen med underteksten.
          Logo uten undertekst kan benyttes i tilfeller der det
          kommer godt fram andre steder hvem NDLA er, eksempelvis på ndla.no.
        </p>
        <p>
          Logo uten undertekst kan kompletteres med en beskrivende tekst
          til høyre. Logoen benyttes i svart eller hvitt avhengig av
          bakgrunn. Den skal plasseres i det øverste eller nederste
          hjørnet av en ytterkant. Logoen skal ikke sentreres.
        </p>
      </section>
      <Logo name to="#" altText="Nasjonal digital læringsarena" />
    </Center>
  ))
  .add('Sammensatte noder', () => (
    <Center>
      <section className="c-factbox">
        <h1 className="u-heading">Sammensatte fagressurser</h1>
      </section>
      <section>
        <section>
          <p>Plikten til forsvarlighet i helsepersonelloven innebærer at «helsepersonell
            eller virksomheter som yter helsehjelp har et helhetlig ansvar for pasienten.
            Dette inkluderer ansvar for å gi adekvate medisinske, behandlingsmessige og <strong>ernæringsmessige</strong> tiltak, samt ansvar for å gi pasienten
            god omsorg».</p>
          <p>
            Ved internkontroll skal det sikres at tilbudet til pasientene er i samsvar
            med regelverket. Internkontroll skal bidra til faglig forsvarlige sosial- og helsetjenester,
            og er et verktøy som skal sikre at daglige arbeidsoppgaver blir utført, styrt og forbedret i henhold til lovens krav. Dette er særlig viktig på områder der svikt kan få alvorlige følger.

            Kilde: <em>Nasjonale faglige retningslinjer for forebygging og behandling av underernæring og internkontroll i helsetjenesten</em>. Helsedirektoratet
          </p>
        </section>
        <section>
          <div className="c-collate">
            <div className="c-collate__info">
              <svg onClick={toggle} width="25px" height="24px" viewBox="48 682 25 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="noun_90272_cc" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(48.500000, 682.000000)">
                  <g id="Group" fill="#000">
                    <path d="M12.1015038,0.327067669 C5.59928833,0.327067669 0.327067669,5.59854468 0.327067669,12.1015038 C0.327067669,18.6044628 5.59928833,23.8759398 12.1015038,23.8759398 C18.6037192,23.8759398 23.8759398,18.6044628 23.8759398,12.1015038 C23.8759398,5.59854468 18.6037192,0.327067669 12.1015038,0.327067669 Z M14.6864263,10.9567807 C14.5736396,11.4976611 12.9361254,14.4856412 12.4591987,15.4957638 C12.1872712,16.0740746 11.6525879,16.8759756 11.7698365,17.5499691 C11.8630404,18.085644 12.4168108,18.3761627 12.8996866,18.4929156 C13.0593231,18.5313374 13.5216247,18.5831449 13.5216247,18.81789 C13.5216247,18.9133249 13.4457725,18.9889292 13.3503376,18.991408 C13.3503376,18.9936389 9.71240871,18.9936389 9.71240871,18.9936389 C9.19334199,18.9936389 8.74194729,18.625285 8.67650621,18.1101844 C8.60164559,17.5301385 8.99379628,17.0088408 9.2307723,16.5125793 C9.73893217,15.4496576 10.3167471,14.4187128 10.8214366,13.3528165 C11.0036306,12.9681023 11.1721909,12.5779346 11.3573594,12.1954514 C11.5425279,11.8149512 11.7713238,11.3831392 11.6188758,10.951823 C11.455521,10.4920003 10.9121618,10.2612214 10.473657,10.1543839 C10.3137725,10.1164578 9.85171888,10.0641545 9.85171888,9.83064883 C9.85171888,9.73447028 9.9280668,9.65861812 10.0235017,9.65638718 C10.0235017,9.65415623 13.6609349,9.65415623 13.6609349,9.65415623 C14.1990886,9.65415623 14.6844432,10.0750613 14.7129497,10.6119756 C14.7196426,10.7262496 14.7094794,10.8412673 14.6864263,10.9567807 Z M13.8537877,8.57388271 C12.9247228,8.57388271 12.1716546,7.82007091 12.1716546,6.8915017 C12.1716546,5.96293249 12.9247228,5.20936858 13.8537877,5.20936858 C14.7816133,5.20936858 15.5359209,5.96318037 15.5359209,6.8915017 C15.5359209,7.82007091 14.7816133,8.57388271 13.8537877,8.57388271 Z" id="Shape" />
                  </g>
                </g>
              </svg></div>
            <div className="c-collate__panel">
              <div className="o-layout">
                <div className="o-layout__item u-1/2@desktop">
                  <LicenseIconList licenseRights={[BY, SA]} />
                  <h4>Oppgaver til &laquo;Ansvar og regelverk. Ernæring&raquo; (Oppgave)</h4>
                  <ul>Forfatter
                      <li>Wenche Heir</li>
                    <li>Marit Smith Sørhøy</li>
                  </ul>
                </div>
                <div className="o-layout__item u-1/2@desktop">
                  <Tabs
                    tabs={[
                        { key: 'image', displayName: 'Brukeroppgave 1', content: <p>Brukeroppgave-innhold</p> },
                        { key: 'video', displayName: 'Brukeroppgave 2', content: <p>Brukeroppgave-innhold</p> },
                        { key: 'audio', displayName: 'Brukeroppgave 3', content: <p>Brukeroppgave-innhold</p> },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="c-collate__article">
              <h3>Utfordringer til deg:</h3>
              <ol>
                <details>
                  <ol>
                    <li>Beskriv hva internkontroll er.</li>
                    <li>Skriv ned noen forslag  på hvordan man kan sikre at pasienter får dekket sine behov for ernæring. Ta gjerne utgangspunkt i en arbeidsplass. Diskuter deretter i klassen.</li>
                  </ol>
                </details></ol>
            </div>
          </div>
        </section>
      </section>
    </Center>
  ))
  .add('Sidenavigasjon', () => (
    <Center>
      <DottedContainer>
        <SiteNav>
          <SiteNavItem to="#">Velg fag</SiteNavItem>
          <SiteNavItem to="#">Søk</SiteNavItem>
          <SiteNavItem to="#">Kontakt</SiteNavItem>
          <SiteNavItem to="#">Hjelp</SiteNavItem>
        </SiteNav>
      </DottedContainer>
    </Center>
  ))
  .add('Hovedhode', () => (
    <Center>
      <Masthead>
        <MastheadItem left>Left</MastheadItem>
        <MastheadItem right>Right</MastheadItem>
      </Masthead>
    </Center>
  ))
  .add('Hovedhode med logo og Sidenavigasjon', () => (
    <Center>
      <Masthead>
        <MastheadItem left>
          <Logo to="#" altText="Nasjonal digital læringsarena" />
        </MastheadItem>
        <MastheadItem right>
          <SiteNav>
            <SiteNavItem onClick={() => alert('clicked')}>Velg fag</SiteNavItem>
            <SiteNavItem to="#">Søk</SiteNavItem>
            <SiteNavItem to="#">Kontakt</SiteNavItem>
            <SiteNavItem to="#">Hjelp</SiteNavItem>
          </SiteNav>
        </MastheadItem>
      </Masthead>
    </Center>
  ))
  .add('Paginering', () => (
    <Center>
      <Pager page={3} lastPage={10} query={{ query: 'Medier' }} pathname="#" />
      <Pager page={4} lastPage={4} query={{ query: 'Medier' }} pathname="#" />
      <Pager page={1} lastPage={3} query={{ query: 'Medier' }} pathname="#" />
      <Pager page={3} lastPage={3} query={{ query: 'Medier' }} pathname="#" />
      <Pager page={1} lastPage={1} query={{ query: 'Medier' }} pathname="#" />
    </Center>
  ))
  .add('Sidefot', () => (
    <Center>
      <Footer>
        <div className="footer_form">
          <label htmlFor="language-select" className="footer_label footer--bold">Velg språk</label>
          <select id="language-select" className="footer_language-select">
            <option value="Norsk">Norsk</option>
            <option value="English">English</option>
          </select>
        </div>
        <Footer.Ruler />
        <Footer.Text>
          <Footer.Editor title="Ansvarlig redaktør:" name=" Øivind Høines" />
          <Footer.Editor title="Utgaveansvarlig:" name="Pål Frønsdal" />
        </Footer.Text>
        <Footer.Text>Nettstedet er utarbeidet av NDLA som åpen kildekode.</Footer.Text>
      </Footer>
    </Center>
  ))
  .add('Lisens ikonstripe', () => (
    <Center>
      <h2 className="u-heading">Lisens ikon stripe</h2>
      <LicenseIconList licenseRights={[BY, SA]} />
      <LicenseIconList licenseRights={[BY, NC, SA]} />
      <LicenseIconList licenseRights={[BY, NC, ND]} />
      <h2 className="u-heading">Lisens ikon stripe med et frehevet ikon</h2>
      <LicenseIconList licenseRights={[BY, SA]} activeLicenseRight={CC} />
      <LicenseIconList licenseRights={[BY, NC, SA]} activeLicenseRight={NC} />
      <LicenseIconList licenseRights={[BY, NC, ND]} activeLicenseRight={ND} />
      <h2 className="u-heading">Klikbar lisens ikon stripe</h2>
      <LicenseIconList licenseRights={[BY, NC, ND]} onLicenseIconClick={licenseRight => alert(`Klikket på: ${licenseRight.title}`)} />
    </Center>
  ))
  .add('Fane', () => (
    <Center>
      <Tabs
        tabs={[
          { key: 'image', displayName: 'Bilde', content: <p>Bilde innhold</p> },
          { key: 'video', displayName: 'Video', content: <p>Video innhold</p> },
          { key: 'audio', displayName: 'Lyd', content: <p>Lyd innhold</p> },
        ]}
      />
    </Center>
  ))
  ;
